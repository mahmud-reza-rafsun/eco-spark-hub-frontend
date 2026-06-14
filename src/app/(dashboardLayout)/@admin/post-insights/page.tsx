import { insightsService } from '@/service/insight.service'
import InsightCard from './_components/InsightCard'

export default async function page() {
    return (
        <div>
            <InsightCard />
        </div>
    )
}
