import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputMask from 'react-input-mask';

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  dateOfBirth: yup.date().required('Date of Birth is required'),
  phone: yup.string().matches(/^\d{10}$/, 'Phone number is not valid').required('phone number is required'),
  zipCode: yup.string().matches(/^\d{5}$/, 'Zipcode is not valid').required('zipcode is required'),
  location: yup.string().required('Location is required'),
  socialSecurityNumber: yup.string().matches(/^\d{3}-\d{2}-\d{4}$/, 'SSN is not valid').required('SSN is required'),
  driverLicense: yup.string().required('Driver’s License is required')
});

const CreateCandidateForm = ({ onSubmit }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 4 }}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            label="Name"
            {...field}
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ''}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            label="Email"
            {...field}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
          />
        )}
      />
      <Controller
        name="dateOfBirth"
        control={control}
        render={({ field }) => (
          <TextField
            label="Date of Birth"
            type="date"
            {...field}
            error={!!errors.dateOfBirth}
            helperText={errors.dateOfBirth ? errors.dateOfBirth.message : ''}
            InputLabelProps={{ shrink: true }}
          />
        )}
      />
      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <InputMask
            mask="9999999999"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
          >
            {() => (
              <TextField
                label="Phone Number"
                error={!!errors.phone}
                helperText={errors.phone ? errors.phone.message : ''}
              />
            )}
          </InputMask>
        )}
      />
      <Controller
        name="zipCode"
        control={control}
        render={({ field }) => (
          <InputMask
            mask="99999"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
          >
            {() => (
              <TextField
                label="Zipcode"
                error={!!errors.zipCode}
                helperText={errors.zipCode ? errors.zipCode.message : ''}
              />
            )}
          </InputMask>
        )}
      />
      <Controller
        name="location"
        control={control}
        render={({ field }) => (
          <TextField
            label="Location"
            {...field}
            error={!!errors.location}
            helperText={errors.location ? errors.location.message : ''}
          />
        )}
      />
      <Controller
        name="socialSecurityNumber"
        control={control}
        render={({ field }) => (
          <InputMask
            mask="999-99-9999"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
          >
            {() => (
              <TextField
                label="SSN"
                error={!!errors.socialSecurityNumber}
                helperText={errors.socialSecurityNumber ? errors.socialSecurityNumber.message : ''}
              />
            )}
          </InputMask>
        )}
      />
      <Controller
        name="driverLicense"
        control={control}
        render={({ field }) => (
          <TextField
            label="Driver’s License"
            {...field}
            error={!!errors.driverLicense}
            helperText={errors.driverLicense ? errors.driverLicense.message : ''}
          />
        )}
      />
      <Button type="submit" variant="contained">Create Candidate</Button>
    </Box>
  );
};

export default CreateCandidateForm;
