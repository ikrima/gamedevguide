# Rust Cheat Sheet

[rustup](https://www.rust-lang.org/tools/install) is the preferred rust toolchain manager
[cargo](https://doc.rust-lang.org/cargo) is the rust package manager

- automatically installed by rustup

## Rustup

|Command|Desc|
|-------|----|
|`rustup install`|install rust toolchain|
|`rustup update`|update rust toolchain|

## Cargo

|Command|Desc|
|-------|----|
|`cargo build`|fetch and compile dependencies|
|`cargo build -p <PKG> --release --target-dir <DIR> --features <X,Y...> --all-features`|'cargo build' PKG with release profile to target DIR with features X,Y,...|
|`cargo check`|'cargo build' without final code gen step|
|`cargo doc`|build documentation|
|`cargo doc --open --document-private-items --no-deps`|'cargo doc' including private items and excluding dependencies|
|`cargo install`|install package|
|`cargo run`|run package|
|`cargo run -p <PKG> -- <ARGS>`|run PKG with command line ARGS|
|`cargo test`|compile/runs tests, doc examples, standalone examples|
|`cargo tree`|display package tree|
|`cargo tree -e features --depth N`|show enabled features on each package up to depth N|
|`cargo tree --format "{p} {f}" --depth N`|more compact version of above|
