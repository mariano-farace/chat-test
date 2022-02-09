import SignedOutMenu from './SignedOutMenu';
const Navbar = () => {

  
    const menu =  <SignedOutMenu />
    return (
        <>
            <nav className="green">
                <div className="nav-wrapper">
                  {/* TODO por que href=# ?? */}
                  {/* TODO por que usa href en vez del objeto de router Link? debe ser porque tiene que hacer llamada al back*/}

                    <a href="/" className="brand-logo">Chat</a>
                    <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>


                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {menu}

                    </ul>
                </div>
            </nav>
            <ul className="sidenav" id="mobile-demo">
                {menu}
            </ul>
        </>

    )
}

export default Navbar
