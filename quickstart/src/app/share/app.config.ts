export class AppConfig {
	public readonly APIUrl: string = 'http://172.17.19.153:3000/api/v1/';
	public readonly serverUrl: string = 'http://172.17.19.153:3000';
	public currentUser: any = JSON.parse(localStorage.getItem("currentUser"));;
}
