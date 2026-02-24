export const simulateNotification = async (type, studentName, parentPhone) => {
  console.log(`Sending ${type} to ${parentPhone} for student ${studentName}...`);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (type === 'whatsapp') {
    return { success: true, message: `WhatsApp sent to ${studentName}'s parent.` };
  } else {
    return { success: true, message: `SMS notification sent for ${studentName}.` };
  }
};

export const bulkNotifyAbsentees = async (absentees) => {
  const results = await Promise.all(
    absentees.map(student => simulateNotification('whatsapp', student.name, 'Parent Phone'))
  );
  return results;
};
