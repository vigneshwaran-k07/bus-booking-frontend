import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function BookingModal({ ticket, onConfirm, onClose }) {
  const [serverError, setServerError] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const selectedGender = watch('gender');

  const onSubmit = async (data) => {
    try {
      setServerError('');
      await onConfirm(ticket.id, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        gender: data.gender,
      });
      onClose();
    } catch (err) {
      setServerError(err.response?.data?.message || 'Booking failed. Please try again.');
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 animate-backdrop-in p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  Seat #{ticket.seat_number}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white">Book Your Seat</h2>
              <p className="text-blue-200 text-sm mt-0.5">Fill in your details to reserve this seat</p>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white hover:bg-white/10 rounded-lg p-1.5 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {serverError && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {serverError}
            </div>
          )}

          {/* Gender picker */}
          <div>
            <span className="text-sm font-semibold text-gray-700 mb-2 block">Gender</span>
            <div className="flex gap-3">
              <GenderCard value="male" label="Male" selected={selectedGender === 'male'} register={register} />
              <GenderCard value="female" label="Female" selected={selectedGender === 'female'} register={register} />
            </div>
            {errors.gender && <FieldError>{errors.gender.message}</FieldError>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="First Name" error={errors.firstName?.message}>
              <input
                {...register('firstName', { required: 'Required', minLength: { value: 2, message: 'Min 2 chars' } })}
                placeholder="Jane"
                className={fieldClass(errors.firstName)}
              />
            </Field>
            <Field label="Last Name" error={errors.lastName?.message}>
              <input
                {...register('lastName', { required: 'Required', minLength: { value: 2, message: 'Min 2 chars' } })}
                placeholder="Doe"
                className={fieldClass(errors.lastName)}
              />
            </Field>
          </div>

          <Field label="Email Address" error={errors.email?.message}>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
              })}
              type="email"
              placeholder="jane@example.com"
              className={fieldClass(errors.email)}
            />
          </Field>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-60 transition-all shadow-lg shadow-blue-600/25"
            >
              {isSubmitting ? <Spinner label="Booking…" /> : 'Confirm Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function GenderCard({ value, label, selected, register }) {
  const styles = {
    male: {
      active: 'border-blue-500 bg-blue-50',
      icon: selected ? 'text-blue-500' : 'text-gray-300',
      text: selected ? 'text-blue-700 font-bold' : 'text-gray-400',
    },
    female: {
      active: 'border-pink-500 bg-pink-50',
      icon: selected ? 'text-pink-500' : 'text-gray-300',
      text: selected ? 'text-pink-700 font-bold' : 'text-gray-400',
    },
  };
  const s = styles[value];

  return (
    <label
      className={`flex-1 flex flex-col items-center gap-2 py-3 px-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
        selected ? s.active : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      <input
        type="radio"
        value={value}
        {...register('gender', { required: 'Please select your gender' })}
        className="sr-only"
      />
      <svg className={`w-8 h-8 transition-colors ${s.icon}`} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
      </svg>
      <span className={`text-xs transition-colors ${s.text}`}>{label}</span>
    </label>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-semibold text-gray-700">{label}</span>
      {children}
      {error && <FieldError>{error}</FieldError>}
    </label>
  );
}

function FieldError({ children }) {
  return (
    <span className="text-xs text-red-500 flex items-center gap-1">
      <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
      {children}
    </span>
  );
}

function Spinner({ label }) {
  return (
    <span className="flex items-center justify-center gap-2">
      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      {label}
    </span>
  );
}

function fieldClass(error) {
  return `w-full rounded-xl border-2 px-3 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 ${
    error
      ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-200'
      : 'border-gray-200 bg-gray-50 focus:border-blue-400 focus:ring-blue-100 focus:bg-white'
  }`;
}
