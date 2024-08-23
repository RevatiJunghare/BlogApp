import './UserAvatar.css';


function getInitials(name:any) {
    const initials = name.split(' ').map((word:any) => word[0]).join('');
    return initials.toUpperCase();
  }
  
  interface Props {
    name:any;
  }

  
  // Avatar component
  const UserAvatar:React.FC<Props>=({ name}) =>{
    const initials = getInitials(name);
  
    // const avatarStyle = {
    //   display: 'inline-block',
    //   width: '40px',
    //   height: '40px',
    //   borderRadius: '50%',
    //   backgroundColor: '#007bff',
    //   color: '#fff',
    //   textAlign: 'center',
    //   lineHeight: '40px',
    //   fontSize: '16px',
    //   fontWeight: 'bold',
    // };
  
    return <div className="avatar-container">
    <div className="avatar">{initials}</div>
    <div className="tooltip">{name}</div>
  </div>
//     <div style={{display: 'inline-block',
//     width: '40px',
//     height: '40px',
//     borderRadius: '50%',
//     // backgroundColor: '#007bff',
//     border:"1px solid #007bff",
//     color: '#007bff',
//     textAlign: 'center',
//     lineHeight: '40px',
//     fontSize: '28px',
//     cursor: 'pointer'
// }} title={name}>{initials}</div>;
  }

  export default UserAvatar