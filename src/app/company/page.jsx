"use client";

import Container from '../components/layout/Container';
import Header from '../components/layout/Header';
import { useTranslations } from 'next-intl';
import List from './list';
import { useRouter } from 'next/navigation';

export default function Company() {
    const t = useTranslations("company");
    const router = useRouter();
    return (
        <Container>
             <Header title={t("title")} buttonText={t("addCompany")} onClick={() => {
                router.push('/company/create');
             }} />
             <List />
        </Container>
    )
}