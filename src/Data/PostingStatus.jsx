export async function getPostingStatus() {
    let postingStatus = null;
    try {
        postingStatus = await KS.Core.getPostingStatus({
            tableName: 'PERSON',
            targetSerial: CR.Script.personSerial,
            includeChargedOffAccounts: 'N',
            includePersonRelatedAccounts: 'N',
            includeClosedAccounts: 'N'
        });
    } catch (error) {
        console.error('Get Posting Status Error', error);
        throw error;
    }
    return postingStatus;
}