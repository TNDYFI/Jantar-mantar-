const {onValueWritten}=require('firebase-functions/v2/database');
const admin=require('firebase-admin');admin.initializeApp();
// Keeps /game/reactionCounts correct; clients cannot write it (see rules).
exports.reactionCounts=onValueWritten('/game/reactions/{uid}',async e=>{
  const b=e.data.before.val(),a=e.data.after.val();
  const bump=(k,n)=>admin.database().ref('/game/reactionCounts/'+k).transaction(v=>Math.max(0,(v||0)+n));
  const jobs=[];
  if(b===1)jobs.push(bump('likes',-1));if(b===-1)jobs.push(bump('dislikes',-1));
  if(a===1)jobs.push(bump('likes',1));if(a===-1)jobs.push(bump('dislikes',1));
  await Promise.all(jobs);
});
