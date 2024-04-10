'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ModeToggle } from '@/components/ui/mode-toggle'

export default function Home() {
	const [loading, setLoading] = useState(true)
	const router = useRouter()

	// function to go router push the path
	const goToUser = (path) => {
		router.push(path)
	}

	return (
		<main className="flex flex-col bg-background w-full md:p-12 p-4">
			<div className="flex flex-col w-full h-screen items-center">
				<h1 className="text-4xl font-bold flex gap-4 mb-4 w-full items-center justify-center">
					SeriousMD Transaction Management App
					<ModeToggle />
				</h1>
				<Card className="w-fit h-fit p-12 text-black rounded-[1rem] shadow-lg flex gap-8 flex-col border border-primary">
					<h1 className="font-semibold text-center text-xl dark:text-primary-foreground">
						Select User
					</h1>
					<div className="flex flex-row gap-8 w-full">
						<Button onClick={(e) => goToUser('/user1')}>User 1</Button>
						<Button onClick={(e) => goToUser('/user2')}>User 2</Button>
						<Button onClick={(e) => goToUser('/user3')}>User 3</Button>
					</div>
				</Card>
			</div>
		</main>
	)
}
