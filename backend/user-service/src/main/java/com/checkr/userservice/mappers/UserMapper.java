package com.checkr.userservice.mappers;

import com.checkr.userservice.dto.UserRegistrationRequestDTO;
import com.checkr.userservice.dto.UserResponse;
import com.checkr.userservice.entity.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Objects;

/**
 *  UserMapper classes to map entities and dto
 */
@Component
public class UserMapper {
    private final ModelMapper modelMapper;

    @Autowired
    public UserMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }
    /**
     *  public method to convert userDTO to entity
     * @return UserRegistrationRequestDTO
     */

    public User convertUserDtoToUser(UserRegistrationRequestDTO userRegistrationRequestDTO) {
        return modelMapper.map(userRegistrationRequestDTO, User.class);
    }

    /**
     *  public method for creating userLoginResponse
     * @return UserResponse
     */
    public UserResponse createUserLoginResponse(User user, String token) {
        UserResponse userResponse = modelMapper.map(user, UserResponse.class);
       return setTokenToUserResponse(userResponse,token);
    }

    private UserResponse setTokenToUserResponse(UserResponse userResponse, String token) {
        userResponse.setToken(Objects.requireNonNullElse(token, ""));
        return userResponse;
    }
}
