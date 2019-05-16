#### **Threads:**

Get Current Thread ID:

-   FPlatformTLS::GetCurrentThreadId()

 

Deal with Thread Local Storage/TLS: FGenericPlatformTLS()

-   Provides allocation, deallocation, etc

-   TlsSlot = FPlatformTLS::AllocTlsSlot()

-   Reinterpret\_cast&lt;bla\*&gt;(FPlatformTLS::GetTlsValue(TlsSlot))

-   FPlatformTLS::SetTlsValue(TlsSlot, bladata);

