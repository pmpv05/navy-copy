//When submiting the email form it will call the sendMail() method
document.getElementById('emailForm').addEventListener('submit', sendMail);

function sendMail(e) {
  e.preventDefault(); //prevent page refresh
  //Obtain subject and body for the email from the corresponding inputs
  const subject = document.getElementById('subject').value;
  const mailBody = document.getElementById('mailBody').value;
  //Mail to the navy final inbox with the subject and body
  var link = 'mailto:navyfinal@gmail.com?subject=' + subject + '&body=' + mailBody;
  //Go to it, pop's an email app like Outlook or Gmail
  window.location.href = link;
}