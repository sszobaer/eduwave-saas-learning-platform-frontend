export default async function DashboardPage(props: any) {
    const params = await props.params;
    console.log('Params:', params);
    return <div>User: {params.id}</div>;
}