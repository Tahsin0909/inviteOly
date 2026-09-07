import Banner from '@/components/banner/Banner';
import CreateEventCta from '@/components/create-your-event-cta/CreateEventCta';
import HowItWorks from '@/components/howItWorks/HowItWorks';
import TrustAndSecurity from '@/components/trust-security/TrustAndSecurity';
import React from 'react';

const page = () => {
    return (
        <main>
            <Banner />
            <HowItWorks />
            <CreateEventCta />
            <TrustAndSecurity />
        </main>
    );
};

export default page;