import { Disclosure} from '@headlessui/react'
import { BellIcon } from '@heroicons/react/outline'
import { Fragment  } from 'react'

type IMenuMobile = {
    navigation:any;
    profile:[];
    avatar_url:string;
    name:string;
    email:string;
}
export default function Mobile(Props ){
    
    const { dataMobile } = Props 
    const { itensMenu, itensProfile, avatar_url, name, email,  logout } = dataMobile 

    return (
        <Disclosure.Panel className="md:hidden"> 
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {itensMenu.map((item, itemIdx) =>
            itemIdx === 0 ? (
              <Fragment key={item}>
                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                <a href="#" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">
                  {item}
                </a>
              </Fragment>
            ) : (
              <a
                key={item}
                href="#"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                {item}
              </a>
            )
          )}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-700">
          <div className="flex items-center px-5">
            <div className="flex-shrink-0">
              <img className="h-10 w-10 rounded-full" src={avatar_url} alt="" />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium leading-none text-white">{name}</div>
              <div className="text-sm font-medium leading-none text-gray-400">{email}</div>
            </div>
            <button className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-3 px-2 space-y-1">
            {itensProfile.map((item) => (
              <a
                key={item}
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
              >
                {item}
              </a>
            ))}
            <a
              href="#" onClick={logout}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
            >
              Sign out
            </a>
          </div>
        </div>
      </Disclosure.Panel>
    )
}