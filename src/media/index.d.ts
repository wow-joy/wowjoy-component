declare module "*.svg" {
  const ReactComponent: React.StatelessComponent<
    React.SVGAttributes<SVGElement>
  >;
  export { ReactComponent };
//   export default value;
}
