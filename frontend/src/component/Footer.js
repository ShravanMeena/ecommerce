import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <div className='d-flex justify-content-center py-5 mt-5'>
        <a href='https://www.pakkamarwadi.tk/' target='_blank'>
          <i class='fas fa-code'></i> with <i class='fas fa-heart'></i>{" "}
          Pakkamarwadi
        </a>
      </div>
    );
  }
}
