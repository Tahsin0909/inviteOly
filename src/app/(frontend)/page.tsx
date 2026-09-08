import Banner from '@/components/banner/Banner';
import CreateEventCta from '@/components/create-your-event-cta/CreateEventCta';
import EventCta from '@/components/create-your-event-cta/EventCta';
import EventTypes from '@/components/event-types/EventTypes';
import HowItWorks from '@/components/howItWorks/HowItWorks';
import TrustAndSecurity from '@/components/trust-security/TrustAndSecurity';
import React from 'react';

const page = () => {
    return (
        <main>
            <Banner />
            <HowItWorks />
            <EventTypes />
            <CreateEventCta />
            <TrustAndSecurity />
            <EventCta />
        </main>
    );
};

export default page;