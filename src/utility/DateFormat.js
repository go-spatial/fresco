
const sec = 1000,
	min = 1000*60,
	hour = 1000*60*60,
	day = 1000*60*60*24,
	week = 1000*60*60*24*7,
	month = 1000*60*60*24*30,
	year = 1000*60*60*24*365, 
	months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	monthsShort = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
	weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
	weekdaysShort = ['sun','mon','tues','wed','thu','fri','sat'];

export default {

	ago:function(dateStr){
		const d = new Date(dateStr);

		const nowDate = new Date();
		const nowTs = nowDate.getTime();
		const diff = nowTs - d.getTime();
		if (diff < 2*sec) return '1 sec ago';
		if (diff < min) return Math.round(diff/sec)+' secs ago';
		if (diff < hour) return Math.round(diff/min)+' min ago';
		if (diff < 2*hour) return '1 hr ago';
		if (diff < day) return Math.round(diff/hour)+' hrs ago';
		if (diff < 2*day) return 'yesterday';
		if (diff < week) return Math.round(diff/day)+' days ago';
		if (diff < 2*week) return 'a week ago';
		if (diff < month) return Math.round(diff/week)+' weeks ago';
		if (diff < 2*month) return 'a month ago';

		return this.long(dateStr);

		if (diff < year) return Math.round(diff/month)+' months ago';
		if (diff < 2*year) return 'a year ago';
		return Math.round(diff/year)+' years ago';
	},

	long:function(dateStr){
		if (dateStr === null || dateStr === '0001-01-01T00:00:00Z') return '-';
		const d = new Date(dateStr);

		const day = d.getDate();
		const monthIndex = d.getMonth();
		const year = d.getFullYear();

		return months[monthIndex] + ' ' + day + ', ' + year;
	}
};