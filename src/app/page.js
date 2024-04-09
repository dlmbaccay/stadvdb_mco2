'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ModeToggle } from '@/components/ui/mode-toggle'
import AppointmentTable from '@/components/appointment-table'

export default function Home() {
    const [appointments, setAppointments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    async function fetchData() {
        try {
            const response = await fetch(`/api/appointments?page=${currentPage}`);
            const data = await response.json();
            setAppointments(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function incrementPage() {
        setCurrentPage(currentPage + 1);
    }

    function decrementPage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }


	return (
		<main className="flex flex-col bg-background w-full md:p-12 p-4">
			<div className="flex flex-col w-full h-screen items-center">
				<h1 className="text-4xl font-bold flex gap-4 mb-4 w-full items-center justify-center">
					SeriousMD Transaction Management App
					<ModeToggle />
				</h1>
				<Card className="md:w-2/3 min-w-full h-full p-6 text-black rounded-[1rem] shadow-lg gap-4 justify-between flex flex-col border border-primary">
					<div className="flex flex-row w-full h-fit p-2 gap-x-6 gap-y-2 items-center flex-wrap justify-between">
						<div className="flex flex-row h-fit p-2 gap-x-6 gap-y-2 items-center flex-wrap">
							<Button className="border border-primary hover:text-background">
								Insert
							</Button>
							<Button className="border border-primary hover:text-background">
								Search
							</Button>
							<Button className="border border-primary hover:text-background">
								View Report
							</Button>
						</div>
						<div className="flex flex-row h-fit p-2 gap-x-6 gap-y-2 items-center">
							<span className="text-sm text-primary dark:text-primary-foreground">
								Showing 1-10 of 100
							</span>
							<Button onClick={decrementPage} className="border border-primary hover:text-background">
								← Prev
							</Button>
							<Button onClick={incrementPage} className="border border-primary hover:text-background">
								Next →
							</Button>
						</div>
					</div>

					<Card className="flex w-full h-full rounded-[1rem] border border-primary overflow-hidden">
						<AppointmentTable appointments={appointments} />
					</Card>
				</Card>
			</div>
		</main>
	)
}
