export const Toast = {
  show(message) {
    $('.toast-body').html(message);
    $('.toast').toast('show');
  },
  render() {
    return (
      <div
        className="toast loginError hide"
        autohide="true"
        data-delay="5000"
        style={{
          position: 'absolute',
          alignContent: 'center',
          justifyContent: 'space-between',
          maxWidth: '100%',
          border: 'none',
          zIndex: 9999,
        }}
      >
        {/* <div class="toast-header">
					<img
						src="/favicon.ico"
						className="rounded mr-2"
						alt="Logo plataforma"
						style={{
							width: 20,
							height: 20,
							borderRadius: 8,
							boxShadow: '0 2px 2px #0000001a',
						}}
					/>
					<strong class="mr-auto">Chaski Notificacion</strong>
					<small>Ahora</small>
					<button
						type="button"
						class="ml-2 mb-1 close"
						data-dismiss="toast"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div> */}

        <div className="toast-body" style={{ display: 'inline' }}></div>
        <button
          type="button"
          className="ml-2 mb-1 close"
          data-dismiss="toast"
          aria-label="Close"
          style={{ display: 'inline' }}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  },
};
