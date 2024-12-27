import path from "path";
import { Project } from "ts-morph";

const project = new Project({});

project.addSourceFilesAtPaths("src/**/*.(ts|tsx)");

const files = project.getSourceFiles();
const sharedUiDirectory = project.getDirectory(path.resolve(__dirname, '..', '..', 'src', 'shared', 'ui'));
const componentsDirectory = sharedUiDirectory?.getDirectories();


componentsDirectory?.forEach((directory) => {
  const indexFilePath = directory.getPath() + '/index.ts';
  const indexFile = directory.getSourceFile(indexFilePath);
  console.log('indexFile', indexFile?.getBaseName())

  if(indexFile) {
    return;
  }

  const sourceCode = `export * from "./${directory.getBaseName()}";\n`;
  const file = directory.createSourceFile(indexFilePath, sourceCode);
  file.save()
  // console.log('directory', directory.getSourceFiles());
})

files.forEach((file) => {
  const importDeclaration = file.getImportDeclarations();
  importDeclaration.forEach((importDeclaration) => {
    const value = importDeclaration.getModuleSpecifierValue();
    const valueWithoutAlias = value.replace('@/', '');

    const segments = valueWithoutAlias.split('/');
    
    const isSharedLayer = segments?.[0] === 'shared';
    const isUiSlice = segments?.[1] === 'ui';

    if (isSharedLayer && isUiSlice) {
      const result = valueWithoutAlias.split('/').slice(0, 3).join('/');
      importDeclaration.setModuleSpecifier("@/" + result);
    }
  });
});

project.save();
