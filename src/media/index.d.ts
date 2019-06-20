declare module "*.svg" {
  const ReactComponent: React.StatelessComponent<
    React.SVGAttributes<SVGElement>
  >;
  export interface Svg{ ReactComponent };
//   export default value;
}
