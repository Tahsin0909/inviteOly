import Banner from '@/components/banner/Banner';
import HowItWorks from '@/components/howItWorks/HowItWorks';
import TrustAndSecurity from '@/components/trust-security/TrustAndSecurity';
import React from 'react';

const page = () => {
    return (
        <main>
            <Banner />
            <HowItWorks />
            <TrustAndSecurity />
        </main>
    );
};

export default page;