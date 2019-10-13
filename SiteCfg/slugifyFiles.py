import os
from pathlib import Path

non_url_safe = ['"', '#', '$', '%', '&', '+',
                ',', '/', ':', ';', '=', '?',
                '@', '[', '\\', ']', '^', '`',
                '{', '|', '}', '~', "'"]

translate_table = {ord(char): u'' for char in non_url_safe}


def _slugify1(text):
  non_safe = [c for c in text if c in non_url_safe]
  if non_safe:
      for c in non_safe:
          text = text.replace(c, '')
  text = u'-'.join(text.split())
  return text

def _slugify2(text):
  text = text.translate(translate_table)
  text = u'_'.join(text.split())
  return text


curDir = Path(os.path.join(os.path.dirname(__file__), "..", "contents", "guides"))
print(curDir)
for root, dirs, files in os.walk(curDir):
  fullDir = Path(root).absolute()
  for file in files:
    if file.endswith(".md"):
      pathFile = Path(fullDir, file)
      newFileName = str(_slugify1(pathFile.stem)).lower() + pathFile.suffix
      pathFile.rename(str(Path(fullDir,newFileName)))

  # Add md file for each subdirectory
  # for subdir in dirs:
  #   if not(Path(fullDir, f'{subdir}.md').exists() and Path(fullDir, f'{subdir}.mdx').exists()):
  #     Path(fullDir, f'{subdir}.md').write_text(f'''---\ntitle: "{subdir}"\n---\n''')
  #     #os.rename(file, pathFile.basename(pathFile)
  #     #print(f'{os.path.join(root, file)}\n')
