from setuptools import setup, find_packages

VERSION = "1.0.4"


setup(
    name="mkdocs-cinder",
    version=VERSION,
    url="https://github.com/chrissimpkins/cinder",
    license="MIT",
    description="A clean responsive theme for the MkDocs static documentation site generator",
    author="Christopher Simpkins",
    author_email="chris@sourcefoundry.org",
    packages=find_packages(),
    include_package_data=True,
    entry_points={"mkdocs.themes": ["cinder = cinder",]},
    zip_safe=False,
)
