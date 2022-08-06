import Head from 'next/head'
import { GetServerSideProps } from 'next'
import apiServerSide from '../services/serverSide'
import Template from '../components/Menu/Template'

type User = {
    name: string;
    email: string;
    avatar_url: string;
}

export default function Calendario(Props: User) {
    return (
        <div>
            <Head>
                <title>Calendário </title>
            </Head> 
            <Template {...Props}>
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-900">Calendario </h1>
                    </div>
                </header>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-0 sm:px-0 border-4 border-dashed border-gray-200 rounded-lg h-96">
                        <strong>MEU CALENDARIO</strong> DA hora
                    </div>
                </div>
            </Template>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return await apiServerSide(ctx)
}