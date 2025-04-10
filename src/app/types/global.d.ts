declare const __DEV__: boolean;
declare const __PROJECT__: 'storybook' | 'frontend' | 'jest';

declare module '*.css' {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.jpg';
declare module '*.png';