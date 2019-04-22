import * as React from "react";
import Components from "@src";

const PROPS = {
  defaultPageSize: 10,
  pageSizeList: [10, 20, 30],
  total: 300
};

export interface Props {
  match: { params: { name?: string } };
  framework: string;
}
export interface State {
  visible: boolean;
}

class Detail extends React.Component<Props, State> {
  state = { visible: false };
  componentDidMount() {
    window.onclick = () => {
      this.setState({ visible: true });
    };
    // this.setState({
    //   container: document.getElementsByTagName('article')[0]
    // })
  }
  close = () => {
    this.setState({ visible: false });
  };
  render() {
    const { match } = this.props;
    const name = match.params.name.replace(
      /^(.)(.*)$/,
      (match, $1, $2) => $1.toUpperCase() + $2
    );
    // this.name = name;
    const ComponentItem = Components[name];

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
