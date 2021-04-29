# Meander

## Common Patterns

### Capture Variable From Pattern Match

* How to capture a variable from a pattern match? Use `:as`
  ````clojure
  (def a_opprmdefblk [(ophirPrmDef :inBoneTrk ctidChannel #{:EArg-In})
                      (ophirPrmDef :inoutBoneTrk ctidChannel #{:EArg-In :EArg-Out})
                      (ophirPrmDef :outBoneTrk ctidChannel #{:EArg-Out})])
  (m/search
   a_opprmdefblk
   [(m/or {:argFlags #{:EArg-Out} :as !argOut}
          {:argFlags #{:EArg-In} :as !argIn})
    ...]
   {:opmirArgIn !argIn
    :opmirArgOut !argOut})
  ````

### Sequence Transformation

* Desired Result
  
  ````clojure
  ;EBNF
  ns <= "obj" | "oppas" | "dc"
  segattr <= ["/"] "@" alphanumeric
  segobj  <= ["/"] alphanumeric
  xpath   <= ns (segattr|segobj) {(segattr|segobj)}
  
  ; Input
  "obj:/myobj/mychild/@myattrib"
  ;; Result =>
  {:ns :obj,
  :xsegs
  ({:segkind :seg-chld, :segpath ""}
    {:segkind :seg-chld, :segpath "myobj"}
    {:segkind :seg-chld, :segpath "mychild"}
    {:segkind :seg-attr, :segpath "@myattrib"})}
  ````

* What this shows:
  
  * Input: a tokenized string
  * Make sure tokens match order pattern (`nstoken xseg {xseg}` )
  * Transform each of the tokens based on the token
    ````clojure
    nstoken =>
      case "obj": :objstore
      default: (keyword nstoken)
    ````

* **Normal Clojure**
  
  ````clojure
  (defn initOppath-clj [axpath]
      (let [nsandpath (str/split axpath #"[:]" 2)
            nsstr (first nsandpath)
            pathtokens (->
                        nsandpath
                        (nth 1)
                        (str/split #"[/]"))]
        {:ns (case nsstr
               "op"    :op
               "obj"   :obj
               "oppas" :oppas)
         :xsegs (map
                 #(if (= (first %1) \@)
                    (->OppathSeg :seg-attr %1)
                    (->OppathSeg :seg-chld %1))
                 pathtokens)}))
  ````

* **Meander**
  
  * **Naive attempt**: 
    
    ````clojure
    (defn initOppath-m1 [axpath]
      (let [axptokens (str/split axpath #"[/:]")]
        {:ns (m/match (first axptokens)
               (m/and ?ns (m/or "op" "obj" "oppas"))
               (keyword ?ns))
         :xsegs (map
                 #(if (= (first %1) \@)
                    (->OppathSeg :seg-attr %1)
                    (->OppathSeg :seg-chld %1))
                 (rest axptokens))}))
    ````
  
  * **Second Attempt:** Better but a nitpick is the functional transformation is on the pattern matching clause where conceptually feels like it should go in the generation part
    
    ````clojure
    (defn initOppath-m2 [axpath]
          (m/match (str/split axpath #"[/:]")
            (m/with [%segattr (m/pred #(= (first %1) \@)    (m/app #(->OppathSeg :seg-attr %1) !seg))
                     %segobj  (m/pred #(not= (first %1) \@) (m/app #(->OppathSeg :seg-chld %1) !seg))]
                    [(m/re #"obj|oppas|dc" ?ns)
                     . (m/or %segobj %segattr) ...])
            {:ns (keyword ?ns) :xsegs !seg}))        
    ````
  
  * **Cleaner Solution** Use a helper to construct the xseg:
    
    ````clojure
    (defn make-xseg [val]
      (m/rewrite val
        (m/re #"@.*" ?val)
        {:kind :seg-attr :val ?val}
    
        (m/re #"[^@].*" ?val)
        {:kind :seg-chld :val ?val}
    
        ?val
        {:kind :unknown :val ?val}))
    
    
    (m/rewrite ["oppas" "obj1" "@attr1" "@attr2" "obj2"]
      [(m/re #"obj|oppas|dc" ?ns) . !segs ...]
      {:ns (m/keyword ?ns)
       :xsegs [(m/app make-xseg !segs) ...]})
    ;; =>
    {:ns :oppas,
     :xsegs
     [{:kind :seg-chld, :val "obj1"}
      {:kind :seg-attr, :val "@attr1"}
      {:kind :seg-attr, :val "@attr2"}
      {:kind :seg-chld, :val "obj2"}]}
    ````
  
  * **Concise Using Recursion**: The second uses `m/cata` on the left or right side:
    
    * Left side
      
      ````clojure
      (m/rewrite ["oppas" "obj1" "@attr1" "@attr2" "obj2"]
        [(m/re #"obj|oppas|dc" ?ns) . (m/cata !segs) ...]
        {:ns (m/keyword ?ns)
         :xsegs [!segs ...]}
      
        (m/re #"@.*" ?val)
        {:kind :seg-attr :val ?val}
      
        (m/re #"[^@].*" ?val)
        {:kind :seg-chld :val ?val}
      
        ?val
        {:kind :unknown :val ?val})
      ````
    
    * Right side
      
      ````clojure
      (m/rewrite ["oppas" "obj1" "@attr1" "@attr2" "obj2"]
        [(m/re #"obj|oppas|dc" ?ns) . !segs ...]
        {:ns (m/keyword ?ns)
         :xsegs [(m/cata !segs) ...]}
      
        (m/re #"@.*" ?val)
        {:kind :seg-attr :val ?val}
      
        (m/re #"[^@].*" ?val)
        {:kind :seg-chld :val ?val}
      
        ?val
        {:kind :unknown :val ?val})
      ````
  
  * **Final Solution:** Cata on the right side can be used to construct a value to be recursively rewritten. It’s the dual of the left.
    
    ````clojure
    (m/rewrite ["oppas" "obj1" "@attr1" "@attr2" "obj2"]
      [(m/re #"obj|oppas|dc" ?ns) . !segs ...]
      {:ns (m/keyword ?ns)
       :xsegs [(m/cata ($EXAMPLE !segs)) ...]}
    
      ($EXAMPLE (m/re #"@.*" ?val))
      {:kind :seg-attr :val ?val}
    
      ($EXAMPLE (m/re #"[^@].*" ?val))
    
      {:kind :seg-chld :val ?val}
    
      ($EXAMPLE ?val)
      {:kind :unknown :val ?val})
    ;; =>
    {:ns :oppas,
     :xsegs
     [{:kind :seg-chld, :val "obj1"}
      {:kind :seg-attr, :val "@attr1"}
      {:kind :seg-attr, :val "@attr2"}
      {:kind :seg-chld, :val "obj2"}]}
    ````

### Split stream based on filter and project   (1-to-many)

* Pseudo code:
  
  ````clojure
  filter(
    (predA? x) => (projA x) :as !projAseq
    (predB? x) => (projB x) :as !projBseq
  )
  ````

* Clojure Code
  
  ````clojure
  ;; Test Data
  (def arglist [{:name :inBoneTrk    :argFlags #{:EArg-In}}
                {:name :inoutBoneTrk :argFlags #{:EArg-In :EArg-Out}}
                {:name :outBoneTrk   :argFlags #{:EArg-Out}}])
  ;; Using match
  (m/match
   arglist
    [(m/or {:argFlags #{:EArg-Out} :as !argOut}
           {:argFlags #{:EArg-In} :as !argIn})
     ...]
    {:opmirArgIn !argIn
     :opmirArgOut !argOut})
  ;; =>
  {:opmirArgIn  [{:name     :inBoneTrk
                  :argFlags #{:EArg-In}}]
   :opmirArgOut [{:name     :inoutBoneTrk
                  :argFlags #{:EArg-Out :EArg-In}} 
                 {:name     :outBoneTrk
                  :argFlags #{:EArg-Out}}]}
  
  ````

* Now let's use m/search to see the difference
  
  ````clojure
  (m/search
   arglist
   [(m/or {:argFlags #{:EArg-Out} :as !argOut}
          {:argFlags #{:EArg-In} :as !argIn})
    ...]
   {:opmirArgIn !argIn
    :opmirArgOut !argOut})
  ;; =>
  ({:opmirArgIn [{:name :inBoneTrk, :argFlags #{:EArg-In}}]
    :opmirArgOut [{:name :inoutBoneTrk, :argFlags #{:EArg-Out :EArg-In}} 
                  {:name :outBoneTrk, :argFlags #{:EArg-Out}}]}
   {:opmirArgIn [{:name :inBoneTrk, :argFlags #{:EArg-In}} 
                 {:name :inoutBoneTrk, :argFlags #{:EArg-Out :EArg-In}}]
    :opmirArgOut [{:name :outBoneTrk, :argFlags #{:EArg-Out}}]})
  ````

* Now let's look using m/scan
  
  ````clojure
  (m/search
   arglist
   (m/scan {:argFlags #{:EArg-In} :as ?argIn})
   ?argIn)
  ;; =>
  ({:name     :inBoneTrk
    :argFlags #{:EArg-In}} 
   {:name     :inoutBoneTrk
    :argFlags #{:EArg-Out :EArg-In}})
  ````

* Now let's look at m/scan with a memory variable
  
  ````clojure
  (m/search
   arglist
   (m/scan {:argFlags #{:EArg-In} :as !argIn})
   !argIn)
  ;; =>
  ([{:name     :inBoneTrk
     :argFlags #{:EArg-In}}]
   [{:name     :inoutBoneTrk
     :argFlags #{:EArg-Out :EArg-In}}])
  ````

---

## TODO

* How to do EBNF like production rules.  Ex: 
  ````clojure
  token ::= (:arg-in|:arg-out) ?argname
  pseudocode-result:: (str (emit-in ?arg-attr)|emit-out :arg-attr) ?argname)    
  ````

---
