import { Outlet, Link, useLoaderData, Form, redirect, NavLink, useSubmit,useNavigation } from "react-router-dom";
import { getContacts, createContact } from "../contact";

export async function loader({request})
{
  const url = new URL(request.url); //localhost:5174:/
  const q = url.searchParams.get("q");
  // console.log('q',q)
  const contacts = await getContacts(q);
  return { contacts, q };
}
export async function action() {
  const contact = await createContact(); //ID palang yung meron.
  // Kailangan may ire-return 
  return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root() {
  const { contacts, q } = useLoaderData();
  const submit = useSubmit();
  const navigation = useNavigation();
  const searching = navigation.location && new URLSearchParams(navigation.location.search).has("q");
  // console.log(navigation.location.search) 
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input 
              id="q" 
              className={searching?"loading":''}
              aria-label="Search contacts"
              placeholder="Search" 
              type="search" 
              name="q"
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
              />

            <div id="search-spinner" aria-hidden={true} hidden={!searching}/>
            <div className="sr-only"aria-live="polite"></div>
          </Form>
          <Form method="post">
            <button type="submit"> New </button>
          </Form>
        </div>
        <nav>
        {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <Link to={`contacts/${contact.id}`}>
                    {contact.first || contact.last ? ( <>{contact.first} {contact.last}</> ) : ( <i>No Name</i> )}{" "} {contact.favorite && <span>★</span>}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
        
      </div>
      <div id="detail">
        <Outlet/>
      </div>
    </>
  );
  }