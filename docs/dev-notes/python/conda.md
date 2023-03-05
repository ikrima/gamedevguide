# Conda Cheatsheet

## Managing Environments

|Command|Desc|
|-------|----|
|`conda info`|get version info|
|`conda create --name ENVNAME python=3.10`|create new environment with package list|
|`conda env create --name ENVNAME --file environment.yml`|create new environment from file|
|`conda env remove --name ENVNAME --all`|delete an entire environment|
|`conda activate ENVNAME / conda deactivate`|activate/deactivate environment|
|`conda install PKGNAME==3.1.4`|install specific package|
|`conda install --file requirements.txt`|install from requirements file|
|`conda list --explicit > spec.txt`|produce an environment spec file|
|`conda env export --from-history > environment.yml`|export environment to file|

## Migrating Environments

- Using `conda-minify` to export minimal environment
  ```bash
  conda install conda-minify -c jamespreed
  conda-minify --name EnvName [--relax] [--how [full|minor]] [-f ./test_env.yml]
  ```

## Update

|Command|Desc|
|-------|----|
|`conda update conda`:|Update conda|
|`conda update python`:|Update python version|
|`conda update anaconda`:|Update all packages to latest stable + compatible version of Anaconda|
|`conda update -n base conda`:|Update base conda environment|
|`conda env update -n myenv -f env.yml --prune`:|Update and uninstall dependencies from environment using file|

## References

- [manage environments](https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html)
- [Official Cheatsheet](https://docs.conda.io/projects/conda/en/latest/user-guide/cheatsheet.html)
