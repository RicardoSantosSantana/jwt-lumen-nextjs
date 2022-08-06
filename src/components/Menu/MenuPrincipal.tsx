import { Fragment, useContext, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { AuthContext } from '../../contexts/AuthContext';
 

import Mobile from './Mobile';
import ProfileDropDown from './ProfileDropDown'

type tMenu = {
    Fragment:any;
    avatar_url:string;
    logout:()=>void;
    open:boolean;
    itensMenu:[{}]
    itensMenuProfile:[{}]
}
type User = {
  name: string;
  email: string;
  avatar_url: string;
}

export default function MenuPrincipal(Props:User){
 
  const { user, setUser, logout } = useContext(AuthContext)

  const itensMenut = ['Dashboard', 'Team', 'Projects', 'Calendar', 'Reports']
  const itensMenu = [
    {"name":"Dashboard","link":"/dashboard" },
    {"name":"Team","link":"/team" },
    {"name":"Projects","link":"/projects" },
    {"name":"Calendar","link":"/calendar" },
    {"name":"Reports","link":"/reports" }
  ]
  const itensProfile = ['Your Profile', 'Settings']

  const avatar_url = user?.avatar_url;
  const name = user?.name
  const email = user?.email;
  
  const dataProfile = { Fragment, avatar_url,logout, itensProfile };  
  const dataMobile = { itensMenu, itensProfile, avatar_url, name, email,logout  }
  

  useEffect(() => { setUser(Props) }, [user])
 
    return (
      <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {itensMenu.map((item, itemIdx) =>
                      itemIdx === 0 ? (
                        <Fragment key={item.name}>
                          {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                          <a href={item.link} className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
                            {item.name}
                          </a>
                        </Fragment>
                      ) : (
                        <a
                          key={item.name+itemIdx}
                          href={item.link}
                          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                          {item.name}
                        </a>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}                    
                  <ProfileDropDown dataProfile={dataProfile} open={open} ></ProfileDropDown>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Mobile dataMobile={dataMobile} />
        </>
      )}
    </Disclosure>
    )
}