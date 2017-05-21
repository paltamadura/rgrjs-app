import React from 'react';
import API from '../API';
import LinkStore from '../stores/LinkStore';

let _getAppState = () => {
  return {links: LinkStore.getAll()};
};

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = _getAppState();
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    API.fetchLinks();
    LinkStore.on("change", this.onChange);
  }
  componentWillUnmount() {
    LinkStore.removeListener("change", this.onChange);
  }
  onChange() {
    console.log("4: In the view, onChange, will get app state using LinkStore.getALl()");
    this.setState(_getAppState());
  }
  render() {
    let links = this.state.links.map((link, i) => {
      return (
          <li key={link._id}>
            <a href={link.url}>{link.title}</a>
          </li>
      );
    });
    return(
      <div>
        <h3>Links</h3>
        <ul>
          {links}
        </ul>
      </div>
    )
  }
}
