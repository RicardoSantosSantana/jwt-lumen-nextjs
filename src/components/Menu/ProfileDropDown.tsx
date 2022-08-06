import { Menu, Transition } from '@headlessui/react'
 
type IProfile = {    
    avatar_url: string;
    Fragment: any;
    logout: () => void;
    profile:[{}];
}
export default function ProfileDropDown(  Props ) {
    
    const  {dataProfile, open } = Props
    const {  avatar_url, Fragment, logout,itensProfile } = dataProfile;
  
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
 
    return (

        <Menu as="div" className="ml-3 relative">
            {({ open }) => (
                <>
                    <div>
                        <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <img src={avatar_url} className="h-8 w-8 rounded-full" alt="" />
                        </Menu.Button>
                    </div>
                    <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95">
                        <Menu.Items
                            static
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                            {itensProfile.map(item => (
                                <Menu.Item key={item}>
                                    {({ active }) => (
                                        <a href="#" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                                            {item}
                                        </a>
                                    )}
                                </Menu.Item>
                            ))}
                            <Menu.Item>
                                <a href="#" onClick={logout} className='block px-4 py-2 text-sm text-gray-700'>
                                    Sign out
                                </a>
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </>
            )}
        </Menu>
    )
}