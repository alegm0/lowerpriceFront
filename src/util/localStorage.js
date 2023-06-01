export function logOut() {
    try {
        localStorage.removeItem('access_token');
        localStorage.removeItem('role');
        localStorage.removeItem('id'); 
        window.location.reload();
    } catch (e) {
        console.log(e, 'Monda');
    }
}