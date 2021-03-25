import React, { Component } from "react";
import { Helmet } from "react-helmet";

export default class Meta extends Component {
  render() {
    const { title, description, keyword } = this.props;
    return (
      <Helmet>
        <meta charSet='utf-8' />
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keyword' content={keyword} />
      </Helmet>
    );
  }
}

Meta.defaultProps = {
  title: "Welcome To Ecommerce | Home",
  description: "We sell the best products for cheap",
  keyword: "electronics, buy electronics, cheap electronics",
};
