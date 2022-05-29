# Conda Cheat Sheet

## Managing Environments

|Command|Desc|
|-------|----|
|`conda info`|get version info|
|`conda create --name ENVNAME python=3.6`|create new environment|
|`conda remove --name ENVNAME --all`|delete an entire environment|
|`conda activate ENVNAME / conda deactivate`|activate/deactivate environment|
|`conda install PKGNAME==3.1.4`|install specific package|
|`conda install --file requirements.txt`|install from requirements file|
|`conda list --explicit > spec.txt`|produce an environment spec file|
|`conda env export --from-history > environment.yml`|export environment to file|
|`conda env create -n ENVNAME --file environment.yml`|import environment from file|

## Update

|Command|Desc|
|-------|----|
|`conda update conda`:|Update conda|
|`conda update -n base conda`:|Update base conda environment|
|`conda update python`:|Update python version|
|`conda update anaconda`:|Update all packages to latest stable + compatible version of Anaconda|

## References

* [manage environments](https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html)
* [cheatsheet](https://docs.conda.io/projects/conda/en/latest/user-guide/cheatsheet.html)
