import { Badge } from "@/components/ui/badge"

interface TeacherScheduleOverviewProps {
  fullWeek?: boolean
}

export function TeacherScheduleOverview({ fullWeek = false }: TeacherScheduleOverviewProps) {
  // Mock schedule data
  const todaySchedule = [
    { time: "08:00 - 09:30", class: "Grade 10A", subject: "Mathematics", room: "Room 101" },
    { time: "10:00 - 11:30", class: "Grade 11B", subject: "Mathematics", room: "Room 203" },
    { time: "12:30 - 13:30", class: "Lunch Break", subject: "", room: "Cafeteria" },
    { time: "13:30 - 15:00", class: "Grade 9B", subject: "Mathematics", room: "Room 105" },
    { time: "15:30 - 17:00", class: "Office Hours", subject: "Student Consultation", room: "Staff Room" },
  ]

  const weeklySchedule = {
    Monday: [
      { time: "08:00 - 09:30", class: "Grade 10A", subject: "Mathematics", room: "Room 101" },
      { time: "11:00 - 12:30", class: "Grade 11B", subject: "Mathematics", room: "Room 203" },
    ],
    Tuesday: [
      { time: "09:30 - 11:00", class: "Grade 9B", subject: "Mathematics", room: "Room 105" },
      { time: "13:00 - 14:30", class: "Office Hours", subject: "Student Consultation", room: "Staff Room" },
    ],
    Wednesday: [
      { time: "08:00 - 09:30", class: "Grade 12A", subject: "Mathematics", room: "Room 301" },
      { time: "13:00 - 14:30", class: "Department Meeting", subject: "Curriculum Planning", room: "Conference Room" },
    ],
    Thursday: [
      { time: "08:00 - 09:30", class: "Grade 11A", subject: "Mathematics", room: "Room 202" },
      { time: "11:00 - 12:30", class: "Grade 10B", subject: "Mathematics", room: "Room 102" },
    ],
    Friday: [
      { time: "09:30 - 11:00", class: "Office Hours", subject: "Student Consultation", room: "Staff Room" },
      { time: "13:00 - 14:30", class: "Grade 9A", subject: "Mathematics", room: "Room 104" },
    ],
  }

  if (fullWeek) {
    return (
      <div className="space-y-6">
        {Object.entries(weeklySchedule).map(([day, schedule]) => (
          <div key={day}>
            <h3 className="mb-2 font-medium">{day}</h3>
            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-2 text-left">Time</th>
                    <th className="p-2 text-left">Class</th>
                    <th className="p-2 text-left">Subject</th>
                    <th className="p-2 text-left">Room</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{item.time}</td>
                      <td className="p-2">
                        {item.class === "Office Hours" || item.class === "Department Meeting" ? (
                          <Badge variant="outline">{item.class}</Badge>
                        ) : (
                          item.class
                        )}
                      </td>
                      <td className="p-2">{item.subject}</td>
                      <td className="p-2">{item.room}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="p-2 text-left">Time</th>
            <th className="p-2 text-left">Class</th>
            <th className="p-2 text-left">Subject</th>
            <th className="p-2 text-left">Room</th>
          </tr>
        </thead>
        <tbody>
          {todaySchedule.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="p-2">{item.time}</td>
              <td className="p-2">
                {item.class === "Office Hours" || item.class === "Lunch Break" ? (
                  <Badge variant="outline">{item.class}</Badge>
                ) : (
                  item.class
                )}
              </td>
              <td className="p-2">{item.subject}</td>
              <td className="p-2">{item.room}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
