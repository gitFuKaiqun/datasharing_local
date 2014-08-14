__author__ = 'Kaiqun'

import os
import MySQLdb

def RetrieveACISA():
	MySQLInfo = open(os.path.dirname(os.path.realpath(__file__)) + '/Logins/MySQL', 'r').readline()
	db = MySQLdb.connect(
		host=MySQLInfo.split('|')[0],
		user=MySQLInfo.split('|')[1],
		passwd=MySQLInfo.split('|')[2],
		db=MySQLInfo.split('|')[3]
	)
	cur = db.cursor()

	SQLcmd = "SELECT * FROM snaps.SNAPsLocation"
	cur.execute(SQLcmd)
	returnList = []
	count = 0
	for item in cur.fetchall():
		count += 1
		tmplist = [item[1], item[2], count, str(item[0])]
		returnList.append(tmplist)
	return returnList