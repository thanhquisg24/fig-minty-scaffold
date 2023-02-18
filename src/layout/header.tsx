/* eslint-disable jsx-a11y/anchor-is-valid */

import ConnectWalletContainer from "./ConnectWalletContainer";

export default function Header() {
  return (
    <header id="header" className="header fixed-top header-scrolled">
      <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
        <a href="#" className="logo d-flex align-items-center">
          {/* <img src="/static/img/logo.png" alt="" /> */}
          <span className="text-theme-1">FIG MINTY</span>
        </a>
        <nav id="navbar" className="navbar">
          <ul>
            <li>
              <ConnectWalletContainer />
            </li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle" />
        </nav>
        {/* .navbar */}
      </div>
    </header>
  );
}
