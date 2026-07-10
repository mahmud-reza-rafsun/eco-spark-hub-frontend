import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 50,
        fontFamily: 'Helvetica',
        fontSize: 11,
        color: '#1e293b',
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        borderBottomColor: '#e2e8f0',
        paddingBottom: 20,
        marginBottom: 30,
    },
    companyName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#4f46e5',
    },
    invoiceTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0f172a',
        textAlign: 'right',
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#0f172a',
        marginBottom: 15,
        marginTop: 10,
    },
    grid: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 8,
        overflow: 'hidden',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    tableRowAlternate: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        backgroundColor: '#f8fafc',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    label: {
        color: '#64748b',
    },
    value: {
        fontWeight: 'bold',
        color: '#0f172a',
    },
    amountValue: {
        fontWeight: 'bold',
        color: '#4f46e5',
    },
    messageBox: {
        marginTop: 25,
        padding: 15,
        backgroundColor: '#f8fafc',
        borderRadius: 8,
        borderLeftWidth: 3,
        borderLeftColor: '#4f46e5',
    },
    messageTitle: {
        color: '#64748b',
        fontSize: 10,
        marginBottom: 5,
    },
    messageText: {
        fontStyle: 'italic',
        color: '#334155',
    },
    footer: {
        position: 'absolute',
        bottom: 40,
        left: 50,
        right: 50,
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
        paddingTop: 15,
        textAlign: 'center',
        color: '#94a3b8',
        fontSize: 9,
    }
});

interface DonationPDFProps {
    name: string;
    email: string;
    amount: number;
    trxId: string;
    senderNumber: string;
    message?: string;
}

export const DonationPDF = ({ name, email, amount, trxId, senderNumber, message }: DonationPDFProps) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.companyName}>BHAC</Text>
                    <Text style={{ color: '#64748b', marginTop: 4 }}>Dhaka, Bangladesh</Text>
                </View>
                <View>
                    <Text style={styles.invoiceTitle}>Donation Receipt</Text>
                    <Text style={{ color: '#64748b', textAlign: 'right', marginTop: 4 }}>
                        Date: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </Text>
                </View>
            </View>

            <Text style={styles.sectionTitle}>Transaction Details</Text>

            <View style={styles.grid}>
                <View style={styles.tableRow}>
                    <Text style={styles.label}>Donor Name</Text>
                    <Text style={styles.value}>{name}</Text>
                </View>

                <View style={styles.tableRowAlternate}>
                    <Text style={styles.label}>Email Address</Text>
                    <Text style={styles.value}>{email}</Text>
                </View>

                <View style={styles.tableRow}>
                    <Text style={styles.label}>Payment Method</Text>
                    <Text style={styles.value}>bKash (Manual)</Text>
                </View>

                <View style={styles.tableRowAlternate}>
                    <Text style={styles.label}>bKash Number</Text>
                    <Text style={styles.value}>{senderNumber}</Text>
                </View>

                <View style={styles.tableRow}>
                    <Text style={styles.label}>Transaction ID</Text>
                    <Text style={[styles.value, { textTransform: 'uppercase' }]}>{trxId}</Text>
                </View>

                <View style={[styles.tableRowAlternate, { borderBottomWidth: 0 }]}>
                    <Text style={styles.label}>Total Contribution</Text>
                    <Text style={styles.amountValue}>BDT {amount} TK</Text>
                </View>
            </View>

            {message && (
                <View style={styles.messageBox}>
                    <Text style={styles.messageTitle}>Donor&apos;s Note:</Text>
                    <Text style={styles.messageText}>{message}</Text>
                </View>
            )}

            <View style={styles.footer}>
                <Text>This is a system-generated electronic receipt and requires no physical signature.</Text>
                <Text style={{ marginTop: 3 }}>Thank you for your generous support!</Text>
            </View>
        </Page>
    </Document>
);
