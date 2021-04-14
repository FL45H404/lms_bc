var t= new Date()
var d= new Date('2020,09,15'); //DOJ
time_difference=  t.getTime()-d.getTime();
                 leave_count=(time_difference/(1000 * 3600 * 24));
                 EarnedLeave=Math.trunc(leave_count)/15;
console.log("Earned leave:",EarnedLeave);

module.exports = leaveType = {
    "Sick": 15,
    "Casual": 15,
    "Earned": EarnedLeave,
    "Maternity": 30,
    "Paternity": 15,
}