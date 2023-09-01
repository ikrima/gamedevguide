# Conda Cheatsheet

## pip

|Command|Desc|
|-------|----|
|`pcu requirements.txt`|_what if_ version of `pip-check-updates` i.e. won't modify `requirements.txt`|
|`pcu requirements.txt -u`|update requirements.txt  package file|
|`pcu requirements.txt -i`|interactive version of `pip-check-updates`|

## Conda

|Command|Desc|
|-------|----|
|||
|Managing Environments||
|||
|`conda info`|get version info|
|`conda create --name <ENV> python=3.10`|create new environment with package list|
|`conda env create --name <ENV> --file env.yml`|create new environment from file|
|`conda env remove --name <ENV> --all`|delete an entire environment|
|`conda activate <ENV>`/`conda deactivate`|activate/deactivate environment|
|`conda list --explicit > spec.txt`|produce an environment spec file|
|`conda env export --from-history > env.yml`|export environment to file|
|||
|Managing Packages||
|||
|`conda install PKGNAME==3.1.4`|install specific package|
|`conda install --file requirements.txt`|install from requirements file|
|`conda update conda`|update conda|
|`conda update python`|update python version|
|`conda update anaconda`|update all packages to latest stable + compatible version of Anaconda|
|`conda update -n base conda`|update base conda environment|
|`conda env update -n <ENV> -f env.yml --prune`|update environment from file and uninstall unused dependencies|

### Migrating Environments

- Using `conda-minify` to export minimal environment
  ```bash
  conda install conda-minify -c jamespreed
  conda-minify --name <ENV> [--relax] [--how [full|minor]] [-f ./test_env.yml]
  ```

## Mamba

|Command|Desc|
|-------|----|
|||
|Managing Environments||
|||
|`mamba info`|get version info|
|`mamba env list`|list environments|
|`mamba env export --no-builds`|show environment|
|`mamba create -n <ENV> <PKG>`|create an environment|
|`mamba env create --file env.yml`|import an environment|
|`mamba env export -n <ENV> > env.yml`|export an environment|
|`mamba env remove -n <ENV>`|remove an environment|
|`mamba env update -n <ENV> -f env.yml --prune`|update environment from file/uninstall unused dependencies|
|`mamba create --name CLONE_ENV_NAME --clone <ENV>`|clone an existing environment|
|`mamba activate <ENV>`/`conda deactivate`|activate/deactivate environment|
|||
|Managing Packages||
|||
|`mamba install -n <ENV> <PKG>`|install package|
|`mamba update -n base mamba`|updating mamba|
|`mamba update -n <ENV> --all`|update package|
|`mamba remove -n <ENV> <PKG>`|removing a package|
|`mamba repoquery search <PKG>`|finding a package|
|`mamba repoquery depends <PKG> [--recursive]`|show pkg direct/transitive dependencies|
|`mamba repoquery depends -t <PKG>`|show pkg transitive dependencies as tree|
|`mamba repoquery whoneeds <PKG>`|show pkg dependants i.e. inverse of depends|
|`mamba repoquery whoneeds -t <PKG>`|show pkg dependants as tree|

## References

- [Conda Official Cheatsheet](https://docs.conda.io/projects/conda/en/latest/user-guide/cheatsheet.html)
- [conda manage environments](https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html)
- [mamba quickstart](https://mamba.readthedocs.io/en/latest/user_guide/mamba.html#quickstart)
