package com.bntu.fitr.visitlog.fapi.service.Impl;

import com.bntu.fitr.visitlog.fapi.DTO.JournalDTO;
import com.bntu.fitr.visitlog.fapi.DTO.SubjectDTO;
import com.bntu.fitr.visitlog.fapi.converter.DefaultConverter;
import com.bntu.fitr.visitlog.fapi.models.Subject;
import com.bntu.fitr.visitlog.fapi.service.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubjectServiceImpl implements SubjectService {

    @Value("${backend.server.url}")
    private String backendServerUrl;

    private final String userURL = "/api/v1/subjects";

    private final DefaultConverter converter;

    @Autowired
    public SubjectServiceImpl(DefaultConverter converter) {
        this.converter = converter;
    }

    public List<Subject> getAllSubjects() {
        RestTemplate restTemplate = new RestTemplate();
        SubjectDTO[] subjectDTO = restTemplate.getForObject(backendServerUrl + userURL, SubjectDTO[].class);
        List<SubjectDTO> subjectDTOList =  subjectDTO == null ? Collections.emptyList() : Arrays.asList(subjectDTO);
        return subjectDTOList.stream().map(converter::toSubject).collect(Collectors.toList());
    }

    public List<Subject> findByTeacherId(String teacherId) {
        RestTemplate restTemplate = new RestTemplate();
        SubjectDTO[] subjectDTO = restTemplate.getForObject(backendServerUrl + userURL + "?teacherId=" + teacherId, SubjectDTO[].class);
        List<SubjectDTO> subjectDTOList =  subjectDTO == null ? Collections.emptyList() : Arrays.asList(subjectDTO);
        return subjectDTOList.stream().map(converter::toSubject).collect(Collectors.toList());
    }

    public List<Subject> findByStudentId(String studentId) {
        RestTemplate restTemplate = new RestTemplate();
        SubjectDTO[] subjectDTO = restTemplate.getForObject(backendServerUrl + userURL + "/student/" + studentId, SubjectDTO[].class);
        List<SubjectDTO> subjectDTOList =  subjectDTO == null ? Collections.emptyList() : Arrays.asList(subjectDTO);
        return subjectDTOList.stream().map(converter::toSubject).collect(Collectors.toList());

    }


    public Subject createSubject(Subject subject) {
        RestTemplate restTemplate = new RestTemplate();
        SubjectDTO subjectDTO =  restTemplate.exchange(backendServerUrl + userURL, HttpMethod.POST, new HttpEntity<>(converter.toSubjectDTO(subject)), SubjectDTO.class).getBody();
        return converter.toSubject(subjectDTO);

    }

    @Override
    public Subject updateSubject(Subject subject) {
        RestTemplate restTemplate = new RestTemplate();
        SubjectDTO subjectDTO =  restTemplate.exchange(backendServerUrl + userURL, HttpMethod.PUT, new HttpEntity<>(converter.toSubjectDTO(subject)), SubjectDTO.class).getBody();
        return converter.toSubject(subjectDTO);
    }

    @Override
    public void deleteSubject(String subjectId) {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.delete(backendServerUrl + userURL + "/"+ subjectId);
    }
}
