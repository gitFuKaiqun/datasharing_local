__author__ = 'Kaiqun'

import os
import MySQLdb
from datetime import datetime

def SNAPSfileGen(TimeRange, ACISA=None, laneDir=None, laneNum=None):
	MySQLInfo = open(os.path.dirname(os.path.realpath(__file__)) + '/Logins/MySQL', 'r').readline()
	db = MySQLdb.connect(
		host=MySQLInfo.split('|')[0],
		user=MySQLInfo.split('|')[1],
		passwd=MySQLInfo.split('|')[2],
		db=MySQLInfo.split('|')[3]
	)
	StartTime = str(datetime.strptime(TimeRange.split(' - ')[0], '%m/%d/%Y %I:%M %p'))
	EndTime = str(datetime.strptime(TimeRange.split(' - ')[1], '%m/%d/%Y %I:%M %p'))
	cur = db.cursor()
	tempfile = 'Time,ACISA,laneDir,laneNum,volume,occupancy,speed\n'
	if not ACISA and not laneDir and not laneNum:
		SQLcmd = "SELECT * FROM snaps.SNAPs_history WHERE Time > '" + StartTime + "' and Time < '" + EndTime + "'"
	elif ACISA:
		SQLcmd = "SELECT * FROM snaps.SNAPs_history WHERE Time > '" + StartTime + "' and Time < '" + EndTime + "'" + " and ACISA in (" + ACISA + ")"
	cur.execute(SQLcmd)
	tempfile += '\n'.join([','.join([str(every) for every in i]) for i in cur.fetchall()])
	return tempfile