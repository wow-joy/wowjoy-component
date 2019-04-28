import * as React from "react";
import Components from "@src";

const PROPS = {
  defaultPageSize: 10,
  pageSizeList: [10, 20, 30],
  headerText: 300
};

export interface Props {
  match: { params: { name?: string } };
  framework: string;
}
export interface State {
  visible: boolean;
  value?: any;
}
class Dad extends React.Component<
  { c?: any; children: any; updater?: any },
  {}
> {
  constructor(props: any, context: any, updater: any) {
    super(props);
    console.log(updater);
  }
  // shouldComponentUpdate(nextProps: any, nextState: any) {
  //   console.log(1)
  //   console.log(nextProps.children.props);
  //   console.log(this.props.children.props);
  //   console.log(this.props === nextProps);
  //   console.log(this.props.children === nextProps.children);
  //   return true;
  // }
  render() {
    console.log("dad render");
    return <div>{this.props.children}</div>;
  }
}
class Son extends React.PureComponent<{ value?: any }, {}> {
  render() {
    console.log("son render");
    return <input value={this.props.value} readOnly />;
  }
}
const App = () => {
  const [value, setState] = React.useState(0);
  return (
    <>
      <Dad
        updater={(...args: any[]) => {
          console.log(args);
        }}
      >
        <Son />
      </Dad>
      <span onClick={() => setState(value + 1)}>{value}</span>
    </>
  );
};
class Detail extends React.Component<Props, State> {
  state = { visible: false, value: 0 };
  componentDidMount() {
    // window.onclick = () => {
    //   this.setState({ visible: true });
    // };
    // this.setState({
    //   container: document.getElementsByTagName('article')[0]
    // })
  }
  close = () => {
    this.setState({ visible: false });
  };
  clickHandle = () => {
    this.setState({
      value: this.state.value + 1
    });
  };
  render() {
    const { match } = this.props;
    const name = match.params.name.replace(
      /^(.)(.*)$/,
      (match, $1, $2) => $1.toUpperCase() + $2
    );
    // this.name = name;
    const ComponentItem = Components[name];

    return <App />;
    return (
      <>
        <Dad>
          <Son value={this.state.value} />
        </Dad>
        <span onClick={this.clickHandle}>{this.state.value}</span>
      </>
    );
    if (ComponentItem) {
      return (
        <ComponentItem {...PROPS} {...this.state} onClose={this.close}>
          content
        </ComponentItem>
      );
    }
    return <div>ComponentItem not found</div>;
  }
}

export default Detail;
