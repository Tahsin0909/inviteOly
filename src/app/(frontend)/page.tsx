import Banner from '@/components/banner/Banner';
import CreateEventCta from '@/components/create-your-event-cta/CreateEventCta';
import EventCta from '@/components/create-your-event-cta/EventCta';
import EventTypes from '@/components/event-types/EventTypes';
import HowItWorks from '@/components/howItWorks/HowItWorks';
// import HowItWorks from '@/components/howItWorks/HowItWorks';
import HowItWorksAlt from '@/components/HowItWorksAlt/HowitWorksAlt';
import TrustAndSecurity from '@/components/trust-security/TrustAndSecurity';
import Pricing from '@/features/payment/components/pricingCard/Pricing';

const page = () => {
    return (
        <main className="w-full overflow-x-hidden">
            <Banner />
            <HowItWorks />
            <HowItWorksAlt />
            {/* <RsvpSection /> */}
            <EventTypes />
            <CreateEventCta />
            <Pricing />
            <TrustAndSecurity />
            <EventCta />
        </main>
    );
};

export default page;