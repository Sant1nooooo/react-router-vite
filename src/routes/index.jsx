export default function Index() {
    return (
      <p id="zero-state"> This is the index page, meaning that this will be initial rendered page 
      in the Outlet of the parent route if there is no children of the parent route to be rendered (unless you navigate to it).</p>
    );
  }