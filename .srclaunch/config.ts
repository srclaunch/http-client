import {
  BuildFormat,
  BuildPlatform,
  BuildTarget,
  BuildTool,
  CodeFormatterTool,
  CodeLinterTool,
  License,
  Project,
  ProjectType,
  PublishAccess,
  StaticTypingTool,
  TestReporter,
  TestTool,
  UniversalPackage,
} from '@srclaunch/types';

const config: Project = {
  name: '@srclaunch/http-client',
  description: 'Wrapper around Axios HTTP client',
  type: ProjectType.Library,
  build: {
    formats: [BuildFormat.ESM, BuildFormat.UMD],
    platform: BuildPlatform.Node,
    target: BuildTarget.ESNext,
    tool: BuildTool.Vite,
  },
  environments: {
    development: {
      formatters: [CodeFormatterTool.Prettier],
      linters: [CodeLinterTool.ESLint],
      staticTyping: [StaticTypingTool.TypeScript],
    },
  },
  test: {
    coverage: {
      reporters: [TestReporter.Lcov, TestReporter.JSONSummary],
    },
    tool: TestTool.Ava,
  },
  release: {
    publish: {
      access: PublishAccess.Public,
      license: License.MIT,
      registry: 'https://registry.npmjs.org/',
    },
  },
  requirements: {
    node: '>=16',
    yarn: '>=3.2.0',
    packages: [
      UniversalPackage.Axios,
      UniversalPackage.NanoID,
      UniversalPackage.SrcLaunchExceptions,
      UniversalPackage.SrcLaunchLogger,
    ],
    srclaunch: {
      dx: true,
      cli: true,
      types: true,
    },
  },
};

export default config;
