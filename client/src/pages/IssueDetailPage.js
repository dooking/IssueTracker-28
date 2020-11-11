import React from 'react';
import IssueDetail from '@components/IssueDetail';
import Header from '@components/header';
import { IssueDetailProvider } from '@contexts/IssueDetailContext';
function IssueDetailPage() {
  return (
    <>
      <Header />
      <IssueDetailProvider>
        <IssueDetail />
      </IssueDetailProvider>
    </>
  );
}
export default IssueDetailPage;
